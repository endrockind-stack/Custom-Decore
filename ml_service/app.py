from fastapi import FastAPI, File, UploadFile
import uuid, os, shutil
app = FastAPI()

@app.get('/generate')
async def gen_get():
    suggestions = []
    for i in range(10):
        suggestions.append({
            'id': f'sug_{i}',
            'name': f'Modern Decor {i+1}',
            'description': 'Stylish 3D printed decor tailored to your room.',
            'image': f'https://source.unsplash.com/collection/139386/800x600?sig={i}'
        })
    return {'suggestions': suggestions}

@app.post('/generate')
async def gen_post(file: UploadFile = File(...)):
    os.makedirs('uploads', exist_ok=True)
    filename = f'uploads/{uuid.uuid4().hex}_{file.filename}'
    with open(filename, 'wb') as out:
        shutil.copyfileobj(file.file, out)
    return await gen_get()
