### Activate the virtual environment ###
# [IMPORTANT]: Run this FIRST every time before coding
cd src/backend
.venv\Scripts\Activate.ps1
.venv\Scripts\activate.bat

### Install dependencies ###
python -m pip install --upgrade pip
pip install django djangorestframework django-cors-headers python-dotenv

# OR

pip install -r requirements.txt


