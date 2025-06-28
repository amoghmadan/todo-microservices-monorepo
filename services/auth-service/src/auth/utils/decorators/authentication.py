from functools import wraps
from http import HTTPStatus

from flask import abort, current_app, jsonify, make_response, request

from auth.models import User


class GatewayAuthentication:
    """Authentication: Gateway"""

    model = User
    id_header = "x-user-id"
    email_header = "x-user-email"

    def __call__(self, get_response):
        @wraps(get_response)
        def authenticate(*args, **kwargs):
            try:
                id_ = int(request.headers.get(self.id_header))
                email = request.headers.get(self.email_header)
                if id_ is None or email is None:
                    raise ValueError('"id" or "email" is None.')
                current_user = self.model.query.filter_by(id=id_, email=email).first()
                if current_user is None:
                    raise ValueError("Invalid User ID or Email.")
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
