import bcrypt

def hash_password(password):
    encoded_utf8 = password.encode('UTF-8')
    hashed_password = bcrypt.hashpw(encoded_utf8, bcrypt.gensalt())
    return hashed_password.decode('UTF-8')

def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('UTF-8'), hashed_password.encode('UTF-8'))