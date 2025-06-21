from functools import wraps
from http import HTTPStatus

import jwt
from flask import abort, current_app, jsonify, make_response, request

from auth.models import User


class TokenAuthentication:
    """Authentication: Token"""

    keyword = "Bearer"
    model = User

    def __call__(self, get_response):
        @wraps(get_response)
        def authenticate(*args, **kwargs):
            authorization = request.headers.get("Authorization")
            try:
                if authorization is None:
                    raise ValueError("Invalid authorization.")
                keyword, token = authorization.split()
                if keyword.title() != self.keyword:
                    raise ValueError("Invalid keyword.")
                decoded = jwt.decode(token, current_app.secret_key, algorithms=[current_app.config["ALGORITHM"]])
                current_user = self.model.query.filter_by(id=decoded["id"]).first()
                if current_user is None:
                    raise ValueError("Invalid token.")
                setattr(request, "user", current_user)
            except (AttributeError, ValueError):
                abort(
                    make_response(
                        jsonify({"detail": HTTPStatus.UNAUTHORIZED.phrase}),
                        HTTPStatus.UNAUTHORIZED,
                    )
                )
            return get_response(*args, **kwargs)

        return authenticate
