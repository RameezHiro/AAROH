import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Create directory if it doesn't exist
os.makedirs("backend/app/models/artifacts", exist_ok=True)

# Generate synthetic data
# Features: rainfall_mm, terrain_slope, historical_landslides
# Target: risk_level (0: Low, 1: Medium, 2: High)
np.random.seed(42)
n_samples = 1000
data = {
    'rainfall_mm': np.random.uniform(0, 100, n_samples),
    'terrain_slope': np.random.uniform(0, 45, n_samples),
    'historical_landslides': np.random.randint(0, 5, n_samples)
}
df = pd.DataFrame(data)

# Create labels based on a heuristic
def calculate_label(row):
    score = (row['rainfall_mm'] * 0.05) + (row['terrain_slope'] * 0.03) + (row['historical_landslides'] * 0.2)
    if score > 6.0:
        return 2 # High
    elif score > 3.0:
        return 1 # Medium
    else:
        return 0 # Low

df['risk_label'] = df.apply(calculate_label, axis=1)

X = df[['rainfall_mm', 'terrain_slope', 'historical_landslides']]
y = df['risk_label']

# Train model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)

# Save model
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../app/models/artifacts/model.pkl"))
joblib.dump(clf, model_path)
print(f"Model saved to {model_path}")
