# frontend
cd frontend
npm install
npm run dev

# backend
pip install -r sabrosa_backend/requirements.txt --upgrade
pip install -e sabrosa_backend
python sabrosa_backend/sabrosa_backend/app.py
