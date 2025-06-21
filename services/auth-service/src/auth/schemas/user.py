from marshmallow import ValidationError, fields, post_load, validates_schema

from auth.models import User
from auth.utils import ma


class UserSchema(ma.SQLAlchemyAutoSchema):
    """Schema: User"""

    email = fields.Email(required=True)
    password_again = fields.Str(load_only=True, required=True)

    class Meta:
        model = User
        load_instance = True
        load_only = ["password", "password_again"]

    @validates_schema
    def validate_passwords(self, data, **kwargs):
        if data.get("password") != data.get("password_again"):
            raise ValidationError(
                "Both the passwords should match.", field_name="password_again"
            )

    @post_load
    def make_instance(self, data, **kwargs):
        instance = super().make_instance(data, **kwargs)
        if instance.password:
            instance.set_password(instance.password)
        return instance
