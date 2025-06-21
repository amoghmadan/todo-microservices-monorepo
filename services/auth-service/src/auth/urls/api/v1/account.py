from flask import Blueprint

from auth.views.account import DetailView, LoginView, RegisterView

account = Blueprint("account", __name__)
account.add_url_rule("/detail", view_func=DetailView.as_view("detail"), methods=["GET"])
account.add_url_rule("/login", view_func=LoginView.as_view("login"), methods=["POST"])
account.add_url_rule(
    "/register", view_func=RegisterView.as_view("register"), methods=["POST"]
)
