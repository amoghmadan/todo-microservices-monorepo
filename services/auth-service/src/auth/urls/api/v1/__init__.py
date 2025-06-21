from flask import Blueprint

from auth.urls.api.v1.account import account

urlpatterns = [("/account", account)]

v1 = Blueprint("v1", __name__)
for path, blueprint in urlpatterns:
    v1.register_blueprint(blueprint, url_prefix=path)

__all__ = ["v1"]
