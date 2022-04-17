# This Python file uses the following encoding: utf-8
from flask import Flask, Blueprint
from controller import *

app.register_blueprint(api_cmap)

if __name__ == '__main__':

    app.run(port=80,debug='Ture')