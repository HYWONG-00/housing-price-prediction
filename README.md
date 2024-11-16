# Bengaluru Housing Price Prediction

### Dataset: Bengaluru House Price Prediction

https://www.kaggle.com/code/mohaiminul101/bengaluru-house-price-prediction

### Folder structure:

- client (Frontend): website UI for housing price prediction with trained model
- server: setup Flask server as backend
- model: Contains all the files for model training. Few data science techniques applied:

1. Data Cleaning: Remove all null values
2. Feature Engineering: remove all outliers, especially price_per_square_feet does not align with number of bedroom/bathroom
3. Finding for best model: GridSearchCV is used to assess between linear regression, lasso and decision tree with different parameters. Then, they are run on K-Fold validation with 5 splits.
   Best model: linear_regression({'fit_intercept': False, 'positive': False}): 84.6% accuracy

### Reference:

- Codebasics
