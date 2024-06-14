from flask_script import Manager, Shell
from app import app, db, User

def make_shell_context():
    return {'app': app, 'db': db, 'User': User}

manager = Manager(app)
manager.add_command("shell", Shell(make_context=make_shell_context))

if __name__ == '__main__':
    manager.run()
