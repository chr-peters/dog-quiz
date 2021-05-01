from setuptools import find_packages, setup

setup(
    name="dog-quiz",
    version="0.1.0",
    packages=find_packages(),
    install_requires=["flask", "requests"],
    python_requires=">=3.7",
)
