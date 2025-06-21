from flask import Flask

from auth import settings
from auth.urls import urlpatterns
from auth.utils import db, ma


def get_wsgi_application():
    app = Flask(__name__)
    app.config.update(
        ALGORITHM=settings.ALGORITHM,
        BASE_DIR=settings.BASE_DIR,
        DEBUG=settings.DEBUG,
        SECRET_KEY=settings.SECRET_KEY,
        SQLALCHEMY_DATABASE_URI=settings.SQLALCHEMY_DATABASE_URI,
        SQLALCHEMY_TRACK_MODIFICATIONS=settings.SQLALCHEMY_TRACK_MODIFICATIONS,
    )

    db.init_app(app)
    ma.init_app(app)

    for url_prefix, blueprint in urlpatterns:
        app.register_blueprint(blueprint, url_prefix=url_prefix)

    with app.app_context():
        db.create_all()

    return app


application = get_wsgi_application()
