from flask import Flask, render_template, jsonify, request, send_from_directory
import os, random, csv

image_folder = 'static/photos'
label_file = 'labels.csv'
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/landing')
def landing():
    return render_template('landing.html')

@app.route('/labelview1')
def labelview1():
    return render_template('labelview1.html')

@app.route('/workspace')
def workspace():
    return render_template('workspace.html')

@app.route('/api/image')
def get_image():
    images = os.listdir(image_folder)
    if not images: 
        return jsonify({'error': 'No images to label'})
    image_to_label = random.choice(images)
    file_path = f'static/photos/{image_to_label}'
    file_size_kb = round((os.path.getsize(file_path)) / 1024, 1)
    return jsonify({
        'filename': image_to_label, 
        "filesize": file_size_kb
    })

@app.route('/photos/<filename>')
def show_image(filename):
    return send_from_directory(image_folder, filename)

@app.route('/api/label', methods=['POST'])
def save_label():
    data = request.json
    filename = data.get('imageFilename')
    label = data.get('labelText')
    if filename and label:
        with open(label_file, 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([filename, label]) 
        return jsonify({'status': 'ok'})
    else:
        return jsonify({'status': 'Data not received'})


if __name__ == "__main__":
    app.run(debug=True)