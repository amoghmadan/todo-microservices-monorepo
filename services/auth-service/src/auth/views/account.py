from datetime import datetime, timedelta
from http import HTTPStatus

import jwt
from flask import current_app, jsonify, request, views
from marshmallow.exceptions import ValidationError
from sqlalchemy.exc import IntegrityError

from auth.models import User
from auth.schemas import TokenSchema, UserSchema
from auth.utils import db
from auth.utils.decorators import TokenAuthentication


class LoginView(views.MethodView):
    """Login View"""

    schema_class = TokenSchema

    def post(self, *args, **kwargs):
        if request.headers.get("Authorization"):
            return jsonify({"token": "Invalid token."}), HTTPStatus.BAD_REQUEST
        schema = self.schema_class()
        try:
            validated_data = schema.load(data=request.json)
        except ValidationError as e:
            return jsonify(e.messages), HTTPStatus.BAD_REQUEST
        user = User.query.filter_by(email=validated_data["email"]).first()
        if not user:
            return jsonify({"detail": "Invalid credentials."}), HTTPStatus.UNAUTHORIZED
        if not user.check_password(validated_data["password"]):
            return jsonify({"detail": "Invalid credentials."}), HTTPStatus.UNAUTHORIZED
        payload = {
            "id": user.id,
            "full_name": f"{user.first_name} {user.last_name}",
            "email": user.email,
            "iat": datetime.now().timestamp(),
        }
        token = jwt.encode(
            payload, current_app.secret_key, algorithm=current_app.config["ALGORITHM"]
        )
        user.last_login = datetime.now()
        db.session.add(user)
        db.session.commit()
        return jsonify(schema.dump({"token": token})), HTTPStatus.CREATED


class DetailView(views.MethodView):
    """Detail View"""

    decorators = [TokenAuthentication()]
    schema_class = UserSchema

    def get(self, *args, **kwargs):
        schema = self.schema_class()
        return jsonify(schema.dump(request.user)), HTTPStatus.OK


class RegisterView(views.MethodView):
    """Register View"""

    model = User
    schema_class = UserSchema

    def post(self, *args, **kwargs):
        schema = self.schema_class()
        try:
            instance = schema.load(data=request.json)
            db.session.add(instance)
            db.session.commit()
            db.session.refresh(instance)
            return jsonify(schema.dump(instance)), HTTPStatus.CREATED
        except ValidationError as e:
            return jsonify(e.messages), HTTPStatus.BAD_REQUEST
        except IntegrityError:
            db.session.rollback()
            return (
                jsonify({"detail": "User with this email already exists."}),
                HTTPStatus.CONFLICT,
            )
