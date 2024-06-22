from data.database import db_session
from data.models import Furniture
# f = Furniture('room', 'MainRoom', "/src/images/MainRoom.jpg")
# db_session.add(f)
# db_session.commit()
print(Furniture.query.all().select(["name", "label", "id"]))