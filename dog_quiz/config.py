import os


def get_config_from_env_vars():
    class Config:
        SECRET_KEY = os.environ["SECRET_KEY"]
        DOG_API_KEY = os.environ["DOG_API_KEY"]

    return Config
