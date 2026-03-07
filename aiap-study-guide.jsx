import { useState } from "react";

const TOPICS = [
  {
    id: "data-quality",
    icon: "🧹",
    title: "Data Quality & Cleaning",
    priority: "HIGH",
    timeEstimate: "30 min review",
    relevance: "EDA Sections 2–3, preprocessing.py",
    color: "#e74c3c",
    concepts: [
      {
        term: "Duplicates",
        definition: "Identical rows in the dataset. You found 393.",
        whyItMatters: "Duplicates bias the model by overweighting certain patterns. Always drop them before analysis.",
        inYourProject: "df.drop_duplicates() — first step in clean_data()",
      },
      {
        term: "Missing Values (NaN)",
        definition: "Cells with no data. Python represents them as NaN (Not a Number).",
        whyItMatters: "Most ML algorithms cannot handle NaN. You must decide: drop the row, or fill (impute) the value.",
        inYourProject: "616 nulls across 5 columns, 472 in CustomerType. You chose imputation because nulls were scattered (most rows missing only 1 column).",
      },
      {
        term: "Imputation — Median",
        definition: "Fill missing values with the middle value when sorted. For [1, 3, 100], median = 3.",
        whyItMatters: "Better than mean for skewed data. ProductPageTime has values up to 63,973 — mean would be pulled high by outliers, but median stays at ~603.",
        inYourProject: "SimpleImputer(strategy='median') for numeric features.",
      },
      {
        term: "Imputation — Mode",
        definition: "Fill with the most frequent value. For categorical data where mean/median don't make sense.",
        whyItMatters: "TrafficSource and GeographicRegion are categories — you can't average 'region 3' and 'region 7'.",
        inYourProject: "SimpleImputer(strategy='most_frequent') for categorical features.",
      },
      {
        term: "String Nulls",
        definition: "Values like '', 'nan', 'None' that look empty but aren't technically Python NaN.",
        whyItMatters: "df.isnull() won't catch these. They pass through as valid categories, creating ghost groups in your data.",
        inYourProject: "472 in CustomerType. Fixed with .replace(['', 'nan', 'None'], np.nan)",
      },
      {
        term: "Invalid Values",
        definition: "Data that's present but logically impossible (e.g., negative bounce rate).",
        whyItMatters: "These corrupt statistics and model training. Must be identified domain-specifically — only your understanding of the feature tells you -0.2 is invalid for a percentage.",
        inYourProject: "BounceRate (348 negatives), ProductPageTime (4 negatives), GeographicRegion (616 negatives) — all converted to NaN.",
      },
    ],
    resources: [
      { name: "Pandas Missing Data Guide", url: "https://pandas.pydata.org/docs/user_guide/missing_data.html", type: "docs" },
      { name: "Scikit-learn Imputation", url: "https://scikit-learn.org/stable/modules/impute.html", type: "docs" },
    ],
  },
  {
    id: "eda",
    icon: "📊",
    title: "Exploratory Data Analysis",
    priority: "MEDIUM",
    timeEstimate: "30 min review",
    relevance: "EDA Sections 4–7, eda.ipynb",
    color: "#f39c12",
    concepts: [
      {
        term: "Univariate Analysis",
        definition: "Examining one variable at a time. Histograms for numeric, bar charts for categorical.",
        whyItMatters: "Reveals the shape of each feature: is it skewed? Are there outliers? What's the typical value?",
        inYourProject: "Section 5 — histograms for numeric features, bar charts for CustomerType/TrafficSource/GeographicRegion.",
      },
      {
        term: "Bivariate Analysis",
        definition: "Examining the relationship between two variables — typically each feature vs. the target.",
        whyItMatters: "Identifies which features are useful predictors. If a feature shows no difference between classes, it may not help the model.",
        inYourProject: "Section 6 — boxplots and purchase-rate bar charts for every feature vs PurchaseCompleted.",
      },
      {
        term: "Skewness (Right-skewed)",
        definition: "A distribution where most values cluster at the low end with a long tail stretching right. Think: most sessions are short, a few are extremely long.",
        whyItMatters: "Linear models assume roughly symmetric distributions. Skewed data can cause poor performance. Fix: log transform.",
        inYourProject: "ProductPageTime ranges 0–63,973 but median is only 603. You applied log1p() to compress the range.",
      },
      {
        term: "Correlation",
        definition: "A number between -1 and +1 measuring how two variables move together. +1 = perfect positive, -1 = perfect negative, 0 = no relationship.",
        whyItMatters: "Identifies strong predictors (PageValue ↔ target = 0.49) and redundancy (BounceRate ↔ ExitRate = 0.81).",
        inYourProject: "Heatmap in Section 7. BounceRate-ExitRate correlation led to creating BounceExitRatio.",
      },
      {
        term: "Multicollinearity",
        definition: "When two predictor variables are highly correlated with each other — they provide redundant information.",
        whyItMatters: "The model can't tell which one is driving the prediction. Wastes model capacity and can make coefficients unstable in Logistic Regression.",
        inYourProject: "BounceRate and ExitRate at 0.81. Solution: combined into BounceExitRatio.",
      },
      {
        term: "Class Imbalance",
        definition: "When one class dominates the target variable. Your data: 84% no-purchase, 16% purchase.",
        whyItMatters: "A model predicting 'no purchase' for everyone gets 84% accuracy but is useless. Drives metric choice (F1, AUC) and use of class_weight='balanced'.",
        inYourProject: "Discovered in Section 4. Led to stratified splitting and weighted models in the pipeline.",
      },
      {
        term: "Pareto Analysis (80/20)",
        definition: "The principle that ~80% of effects come from ~20% of causes. Visualized as a cumulative bar chart.",
        whyItMatters: "Identifies which few regions/sources drive most purchases. Directly actionable for marketing budget allocation.",
        inYourProject: "Applied to GeographicRegion and TrafficSource. Found regions 1–4 drive ~80% of purchases.",
      },
    ],
    resources: [
      { name: "StatQuest: Correlation", url: "https://www.youtube.com/watch?v=xZ_z8KWkhXE", type: "video" },
      { name: "Kaggle: Data Cleaning Course", url: "https://www.kaggle.com/learn/data-cleaning", type: "course" },
    ],
  },
  {
    id: "feature-eng",
    icon: "⚙️",
    title: "Feature Engineering",
    priority: "HIGH",
    timeEstimate: "45 min review",
    relevance: "preprocessing.py, config.py, README (f)",
    color: "#2ecc71",
    concepts: [
      {
        term: "Feature Engineering",
        definition: "Creating new columns from existing ones to give the model a better signal.",
        whyItMatters: "Raw data might contain the information, but the model can't always extract it efficiently. A well-engineered feature hands the pattern to the model directly.",
        inYourProject: "4 engineered features: BounceExitRatio, HasPageValue, LogProductPageTime, IsNewVisitor.",
      },
      {
        term: "Log Transform (log1p)",
        definition: "Applies log(1 + x) to compress large ranges. Turns [0, 100, 10000, 60000] into roughly [0, 4.6, 9.2, 11.0].",
        whyItMatters: "Makes skewed distributions more symmetric. Helps linear models that struggle with extreme ranges. The +1 handles zeros (since log(0) is undefined).",
        inYourProject: "LogProductPageTime: log1p(ProductPageTime.clip(lower=0))",
      },
      {
        term: "Binary Flag",
        definition: "Converts a continuous variable into 0/1. Captures the most important signal: presence vs absence.",
        whyItMatters: "When the key question isn't 'how much?' but 'any at all?', a binary flag is more informative than the raw value.",
        inYourProject: "HasPageValue: PageValue > 0. Most sessions have PageValue=0; the binary split captures the dominant signal.",
      },
      {
        term: "Ratio Feature",
        definition: "Divides one feature by another to capture their relationship in one number.",
        whyItMatters: "When two features are correlated, their ratio reduces redundancy while preserving the interaction.",
        inYourProject: "BounceExitRatio: BounceRate / (ExitRate + 1e-6). The 1e-6 prevents division by zero.",
      },
      {
        term: "One-Hot Encoding",
        definition: "Converts categories into binary columns. ['A', 'B', 'C'] becomes three columns: is_A (0/1), is_B (0/1), is_C (0/1).",
        whyItMatters: "ML models need numbers, not strings. One-hot encoding treats each category independently without imposing an artificial order.",
        inYourProject: "Applied to CustomerType, TrafficSource, GeographicRegion. drop='first' removes one redundant column per feature.",
      },
      {
        term: "Standard Scaling",
        definition: "Transforms features to mean=0, std=1. Formula: (value - mean) / std.",
        whyItMatters: "Without scaling, ProductPageTime (0–63,973) would dominate BounceRate (0–0.2) in Logistic Regression simply because its numbers are bigger.",
        inYourProject: "StandardScaler() in the numeric pipeline. Applied after imputation.",
      },
    ],
    resources: [
      { name: "Scikit-learn Preprocessing", url: "https://scikit-learn.org/stable/modules/preprocessing.html", type: "docs" },
      { name: "Kaggle Feature Engineering", url: "https://www.kaggle.com/learn/feature-engineering", type: "course" },
    ],
  },
  {
    id: "leakage",
    icon: "🔒",
    title: "Train/Test Split & Data Leakage",
    priority: "CRITICAL",
    timeEstimate: "45 min review",
    relevance: "preprocessing.py — fit_transform vs transform",
    color: "#9b59b6",
    concepts: [
      {
        term: "Train/Test Split",
        definition: "Divide data into training (80%) and testing (20%). Train builds the model; test evaluates it on 'unseen' data.",
        whyItMatters: "If you evaluate on data the model already trained on, scores are artificially high. The test set simulates real future data.",
        inYourProject: "train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)",
      },
      {
        term: "Stratified Split",
        definition: "Ensures both train and test have the same proportion of each class.",
        whyItMatters: "Without stratification, random chance might put 20% purchasers in test and 12% in train. Model evaluation becomes unreliable.",
        inYourProject: "stratify=y guarantees both sets have ~16% purchasers.",
      },
      {
        term: "Data Leakage",
        definition: "When information from the test set influences the training process, even indirectly.",
        whyItMatters: "Makes your evaluation optimistic — the model appears better than it truly is on unseen data. The most common ML mistake.",
        inYourProject: "Prevented by: fit_transform on train (learn statistics), transform on test (apply same statistics).",
      },
      {
        term: "fit_transform vs transform",
        definition: "fit = learn parameters (e.g., compute median). transform = apply those parameters. fit_transform = both at once.",
        whyItMatters: "Training data: fit_transform (learn + apply). Test data: transform only (apply what was learned from training). This is the core mechanism preventing data leakage.",
        inYourProject: "preprocessor.fit_transform(X_train) then preprocessor.transform(X_test). The preprocessor remembers train statistics.",
      },
      {
        term: "Target Leakage",
        definition: "A feature that contains information derived from the target, making prediction trivially easy but unrealistic.",
        whyItMatters: "The model appears excellent in evaluation but fails in production because the leaky feature isn't available at prediction time.",
        inYourProject: "PageValue may have target leakage — it's derived from Google Analytics transaction tracking, which may only be computed after a purchase.",
      },
      {
        term: "random_state",
        definition: "A seed that controls randomness for reproducibility. Same seed = same results every run.",
        whyItMatters: "Essential during development so reviewers can verify your reported metrics. In production, it becomes irrelevant.",
        inYourProject: "Set to 42 throughout config.py. Used in train_test_split, RandomForest, GradientBoosting.",
      },
    ],
    resources: [
      { name: "StatQuest: Train/Test", url: "https://www.youtube.com/watch?v=fSytzGwwBVw", type: "video" },
      { name: "Scikit-learn Cross-validation", url: "https://scikit-learn.org/stable/modules/cross_validation.html", type: "docs" },
    ],
  },
  {
    id: "models",
    icon: "🤖",
    title: "Machine Learning Models",
    priority: "CRITICAL",
    timeEstimate: "1.5 hrs review",
    relevance: "model.py, README (g)",
    color: "#3498db",
    concepts: [
      {
        term: "Logistic Regression",
        definition: "A linear classification model. Learns a weight per feature, sums them, passes through a sigmoid function to output probability between 0 and 1.",
        whyItMatters: "Simplest baseline. If complex models can't beat it, the problem is fundamentally linear. Highly interpretable — coefficients directly show feature impact.",
        inYourProject: "Best F1 (0.65) and recall (0.76). Strong performance suggests the relationship is largely linear, driven by PageValue.",
      },
      {
        term: "Random Forest",
        definition: "Ensemble of many decision trees, each trained on a random subset of data and features. Final prediction = majority vote.",
        whyItMatters: "Handles non-linear relationships. Robust against overfitting because individual trees' errors cancel out. Provides feature importance for free.",
        inYourProject: "n_estimators=100, class_weight='balanced'. Highest precision (0.71) but lowest recall (0.51).",
      },
      {
        term: "Gradient Boosting",
        definition: "Builds trees sequentially — each new tree specifically corrects the mistakes of all previous trees combined.",
        whyItMatters: "Usually the best performer on tabular data. Controlled by learning_rate (how aggressively each tree contributes) and n_estimators (how many trees).",
        inYourProject: "Best ROC-AUC (0.878) and precision (0.72). Recommended model for deployment.",
      },
      {
        term: "class_weight='balanced'",
        definition: "Tells the model to weight minority class errors more heavily. Effectively multiplies minority loss by (total / (2 × minority_count)).",
        whyItMatters: "Without it, the model might learn to always predict 'no purchase' because that's right 84% of the time. Balancing forces it to also learn the purchase patterns.",
        inYourProject: "Used in LogisticRegression and RandomForest. GradientBoosting doesn't support it directly but handles imbalance through sequential error correction.",
      },
      {
        term: "Sigmoid Function",
        definition: "Mathematical function that squishes any input to a value between 0 and 1. Formula: 1 / (1 + e^(-x)).",
        whyItMatters: "Converts raw model output (any number) into a probability. The threshold (default 0.5) then converts probability to a class label.",
        inYourProject: "Used internally by Logistic Regression. predict_proba() returns this probability; predict() applies the 0.5 threshold.",
      },
      {
        term: "Bagging vs Boosting",
        definition: "Bagging: train models in parallel on random subsets, then average. Boosting: train models sequentially, each fixing the last one's errors.",
        whyItMatters: "Random Forest uses bagging (robust, hard to overfit). Gradient Boosting uses boosting (more powerful, can overfit).",
        inYourProject: "Both approaches used — comparing them is part of the assessment's model evaluation requirement.",
      },
    ],
    resources: [
      { name: "StatQuest: Logistic Regression", url: "https://www.youtube.com/watch?v=yIYKR4sgzI8", type: "video" },
      { name: "StatQuest: Random Forest", url: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ", type: "video" },
      { name: "StatQuest: Gradient Boosting", url: "https://www.youtube.com/watch?v=3CC4N4z3GJc", type: "video" },
      { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", type: "course" },
      { name: "StatQuest Illustrated Guide to ML (AIAP-recommended)", url: "https://statquest.gumroad.com/l/wvtmc", type: "book" },
    ],
  },
  {
    id: "metrics",
    icon: "📏",
    title: "Evaluation Metrics",
    priority: "CRITICAL",
    timeEstimate: "1 hr review",
    relevance: "model.py, README (h)",
    color: "#1abc9c",
    concepts: [
      {
        term: "Confusion Matrix",
        definition: "A 2×2 table: True Negatives (correct 'no'), False Positives (false alarm), False Negatives (missed), True Positives (correct catch).",
        whyItMatters: "Foundation of all classification metrics. Every other metric is derived from these four numbers.",
        inYourProject: "LogReg: TN=1783, FP=223, FN=91, TP=291. Total = 2388 = test set size.",
      },
      {
        term: "Accuracy",
        definition: "(TN + TP) / Total. What percentage of all predictions were correct?",
        whyItMatters: "Misleading for imbalanced data. A model predicting all 'no purchase' gets 84% accuracy — technically high but useless.",
        inYourProject: "Range: 0.87–0.89 across models. Only ~3-5% above naive baseline. Not the right metric for this problem.",
      },
      {
        term: "Precision",
        definition: "TP / (TP + FP). 'When the model says purchaser, how often is it right?'",
        whyItMatters: "Important when false positives are costly (e.g., assigning expensive personal sales agents to non-buyers).",
        inYourProject: "LogReg: 0.57 (many false alarms). GradientBoosting: 0.72 (more targeted).",
      },
      {
        term: "Recall (Sensitivity)",
        definition: "TP / (TP + FN). 'Of all actual purchasers, how many did the model catch?'",
        whyItMatters: "Important when false negatives are costly (e.g., missing a potential buyer you could have converted).",
        inYourProject: "LogReg: 0.76 (catches most buyers). GradientBoosting: 0.54 (misses almost half).",
      },
      {
        term: "F1 Score",
        definition: "2 × (Precision × Recall) / (Precision + Recall). Harmonic mean — punishes extreme imbalances.",
        whyItMatters: "If precision=1.0 but recall=0.1, F1=0.18 (not 0.55 as arithmetic mean would give). Best single metric for imbalanced classification.",
        inYourProject: "Primary metric. LogReg: 0.65 (best), GradientBoosting: 0.62, RandomForest: 0.60.",
      },
      {
        term: "ROC-AUC",
        definition: "Area Under the ROC Curve. Measures: if I pick one random purchaser and one random non-purchaser, what's the probability the model scores the purchaser higher?",
        whyItMatters: "Threshold-independent — evaluates ranking ability regardless of where you set the 0.5 cutoff. Best for comparing models. 0.5 = random, 1.0 = perfect.",
        inYourProject: "GradientBoosting: 0.878 (best). LogReg: 0.871. RandomForest: 0.864.",
      },
      {
        term: "Precision-Recall Tradeoff",
        definition: "You can't maximise both. Lowering the threshold catches more positives (↑ recall) but also creates more false alarms (↓ precision).",
        whyItMatters: "Your LogReg (high recall, low precision) vs GradientBoosting (high precision, low recall) illustrate this. The right balance depends on business costs.",
        inYourProject: "Discussed in README (h) analysis and (i) deployment considerations — threshold should be tuned to business context.",
      },
    ],
    resources: [
      { name: "StatQuest: Confusion Matrix", url: "https://www.youtube.com/watch?v=Kdsp6soqA7o", type: "video" },
      { name: "StatQuest: ROC and AUC", url: "https://www.youtube.com/watch?v=4jRBRDbJemM", type: "video" },
      { name: "StatQuest: F1 Score", url: "https://www.youtube.com/watch?v=HBi-P5j0Kec", type: "video" },
      { name: "Google ML: Classification", url: "https://developers.google.com/machine-learning/crash-course/classification", type: "course" },
    ],
  },
  {
    id: "pipeline",
    icon: "🔧",
    title: "Pipeline Architecture",
    priority: "MEDIUM",
    timeEstimate: "30 min review",
    relevance: "preprocessing.py, pipeline.py, config.py",
    color: "#e67e22",
    concepts: [
      {
        term: "sklearn Pipeline",
        definition: "Chains processing steps sequentially: impute → scale, or impute → encode. One object remembers all learned parameters.",
        whyItMatters: "Without it, you'd manually track dozens of statistics (medians, means, stds) across every column. The pipeline wraps it all into fit/transform calls.",
        inYourProject: "numeric_pipeline = Pipeline([('imputer', ...), ('scaler', ...)])",
      },
      {
        term: "ColumnTransformer",
        definition: "Routes different columns to different pipelines. Numeric columns get impute→scale, categorical get impute→encode.",
        whyItMatters: "Different data types need different treatment. ColumnTransformer handles the routing automatically.",
        inYourProject: "Sends 9 numeric features to numeric_pipeline and 3 categorical features to categorical_pipeline.",
      },
      {
        term: "Configuration-driven Design",
        definition: "All tuneable parameters in one central file (config.py) instead of scattered through code.",
        whyItMatters: "Assessment requires 'easily configurable' pipeline. Reviewer can change any parameter without touching the logic code.",
        inYourProject: "CONFIG dict holds paths, feature lists, model hyperparameters, imputation strategies — everything in one place.",
      },
      {
        term: "Feature Names (get_feature_names_out)",
        definition: "After one-hot encoding, original 9 columns become ~42 columns. This method maps each to a human-readable name.",
        whyItMatters: "Essential for interpreting feature importance. Without it, you'd see 'column 37 is important' instead of 'CustomerType_New_Visitor is important'.",
        inYourProject: "Used in print_feature_importance() to label the top 10 features.",
      },
    ],
    resources: [
      { name: "Scikit-learn Pipelines", url: "https://scikit-learn.org/stable/modules/compose.html", type: "docs" },
      { name: "DataSchool: Pipelines", url: "https://www.youtube.com/watch?v=irHhDMbw3xo", type: "video" },
    ],
  },
  {
    id: "deployment",
    icon: "🚀",
    title: "Deployment & Business",
    priority: "MEDIUM",
    timeEstimate: "30 min review",
    relevance: "README (i), Actionable Insights",
    color: "#34495e",
    concepts: [
      {
        term: "Data Drift",
        definition: "When incoming data distributions change over time (e.g., new customer demographics, seasonal shifts).",
        whyItMatters: "A model trained on last year's data may not work on this year's customers. Requires monitoring and periodic retraining.",
        inYourProject: "Listed in deployment considerations — recommend monthly retraining.",
      },
      {
        term: "Concept Drift",
        definition: "When the relationship between features and target changes (e.g., economic downturn changes purchase behavior).",
        whyItMatters: "Even if features look the same, the mapping to outcomes shifts. Harder to detect than data drift.",
        inYourProject: "Noted as a monitoring requirement for production deployment.",
      },
      {
        term: "Threshold Tuning",
        definition: "Adjusting the probability cutoff (default 0.5) that converts a probability into a class label.",
        whyItMatters: "Lowering to 0.3 catches more buyers (↑ recall) but flags more non-buyers (↓ precision). Optimal threshold depends on business costs of each error type.",
        inYourProject: "Recommended as a deployment consideration. Different thresholds for different use cases (cheap email vs expensive personal agent).",
      },
      {
        term: "Conversion Rate",
        definition: "Percentage of visitors who complete a purchase. Your dataset: ~16%.",
        whyItMatters: "The core business metric. All insights should connect back to how to improve this number.",
        inYourProject: "Analysis of conversion rates by feature (traffic source, region, customer type) drives actionable insights.",
      },
      {
        term: "ML Lifecycle",
        definition: "The full cycle: problem definition → data collection → EDA → feature engineering → modeling → evaluation → deployment → monitoring → retraining.",
        whyItMatters: "Your assessment covers the middle stages. Understanding the full cycle shows you grasp how models work in production.",
        inYourProject: "The pipeline structure (load → preprocess → train → evaluate) implements the core stages.",
      },
    ],
    resources: [
      { name: "ML Lifecycle (DataCamp)", url: "https://www.datacamp.com/blog/machine-learning-lifecycle-explained", type: "article" },
      { name: "AISG: AI4I Literacy in AI", url: "https://learn.aisingapore.org/courses/ai-for-industry-part-1/", type: "course" },
      { name: "Made With ML (Production)", url: "https://madewithml.com", type: "course" },
    ],
  },
  {
    id: "fundamentals",
    icon: "🐍",
    title: "Fundamentals (AIAP Field Guide §1)",
    priority: "FOUNDATION",
    timeEstimate: "Self-assess",
    relevance: "Environment setup, Git, Python, SQL",
    color: "#7f8c8d",
    concepts: [
      {
        term: "Python",
        definition: "Primary language for ML development. Used throughout this project for data manipulation, modeling, and pipeline construction.",
        whyItMatters: "AIAP requires solid Python proficiency. You should be comfortable with functions, classes, list comprehensions, and package management.",
        inYourProject: "All .py files in src/, EDA notebook, virtual environment management.",
      },
      {
        term: "SQL / SQLite",
        definition: "Structured Query Language for querying databases. SQLite is a lightweight file-based database.",
        whyItMatters: "Assessment requires data to be loaded via SQLite. Real-world data often lives in databases, not CSVs.",
        inYourProject: "sqlite3.connect() + pd.read_sql() in data_loader.py.",
      },
      {
        term: "Git & Version Control",
        definition: "Tracks code changes over time. git add → git commit → git push is the basic workflow.",
        whyItMatters: "Assessment requires submission via private GitHub repo. Industry standard for code collaboration.",
        inYourProject: "Private repo, .gitignore for data/ and venv/, GitHub Actions for CI.",
      },
      {
        term: "Bash / Shell Scripting",
        definition: "Command-line scripting language. run.sh is a bash script that executes your pipeline.",
        whyItMatters: "Assessment requires an executable bash script. CRLF vs LF line endings is a common Windows/Linux pitfall.",
        inYourProject: "run.sh with shebang (#!/bin/bash), curl for data download, chmod +x for permissions.",
      },
      {
        term: "Virtual Environments",
        definition: "Isolated Python installations. Keeps project dependencies separate from system Python.",
        whyItMatters: "Reproducibility — ensures your code runs with the exact same package versions on any machine.",
        inYourProject: "python3 -m venv venv, requirements.txt for dependency management.",
      },
    ],
    resources: [
      { name: "Python Tutorial (Official)", url: "https://docs.python.org/3/tutorial/index.html", type: "docs" },
      { name: "Crash Course on Python (Google)", url: "https://www.coursera.org/learn/python-crash-course", type: "course" },
      { name: "Git & GitHub (Google)", url: "https://www.coursera.org/learn/introduction-git-github", type: "course" },
      { name: "MIT Missing Semester", url: "https://missing.csail.mit.edu", type: "course" },
      { name: "SQL for Data Analysis", url: "https://www.udacity.com/course/sql-for-data-analysis--ud198", type: "course" },
    ],
  },
];

const PRIORITY_ORDER = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, FOUNDATION: 3 };

const PRIORITY_STYLES = {
  CRITICAL: { bg: "rgba(231,76,60,0.12)", border: "#e74c3c", text: "#c0392b" },
  HIGH: { bg: "rgba(243,156,18,0.12)", border: "#f39c12", text: "#e67e22" },
  MEDIUM: { bg: "rgba(52,152,219,0.12)", border: "#3498db", text: "#2980b9" },
  FOUNDATION: { bg: "rgba(127,140,141,0.12)", border: "#7f8c8d", text: "#7f8c8d" },
};

const TYPE_ICONS = { video: "▶", docs: "📄", course: "🎓", book: "📕", article: "📰" };

export default function StudyGuide() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [expandedConcept, setExpandedConcept] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedTopics = [...TOPICS].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );

  const totalConcepts = TOPICS.reduce((s, t) => s + t.concepts.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div style={{ fontFamily: "'Georgia', 'Palatino', serif", background: "#fafaf7", minHeight: "100vh", color: "#2c2c2c" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "40px 24px 32px", color: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#e94560", marginBottom: 8, fontFamily: "'Courier New', monospace" }}>
            AIAP Batch 23 — Technical Assessment
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 400, margin: "0 0 8px", lineHeight: 1.2 }}>
            Comprehensive Study Guide
          </h1>
          <p style={{ fontSize: 15, color: "#a0a0b8", margin: 0, maxWidth: 600 }}>
            Every concept used in your EDA notebook, ML pipeline, and README — mapped to learning resources from the AIAP Field Guide and beyond.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ background: "rgba(233,69,96,0.2)", borderRadius: 8, padding: "8px 16px", fontSize: 13, color: "#e94560", fontFamily: "monospace" }}>
              {checkedCount}/{totalConcepts} concepts reviewed
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 4, height: 6, overflow: "hidden" }}>
              <div style={{ width: `${(checkedCount / totalConcepts) * 100}%`, height: "100%", background: "#e94560", borderRadius: 4, transition: "width 0.3s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #ddd", marginTop: 24 }}>
          {["overview", "by-priority", "resources"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "'Courier New', monospace",
                textTransform: "uppercase",
                letterSpacing: 1,
                color: activeTab === tab ? "#e94560" : "#888",
                borderBottom: activeTab === tab ? "2px solid #e94560" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {tab === "overview" ? "Study Order" : tab === "by-priority" ? "All Topics" : "Resources"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 24px 60px" }}>

        {/* STUDY ORDER TAB */}
        {activeTab === "overview" && (
          <div>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 24 }}>
              Prioritised for interview preparation. Start with the topics most likely to be asked about.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {sortedTopics.map((topic, idx) => {
                const ps = PRIORITY_STYLES[topic.priority];
                const topicChecked = topic.concepts.filter((_, ci) => checkedItems[`${topic.id}-${ci}`]).length;
                return (
                  <div key={topic.id} style={{ border: `1px solid ${ps.border}33`, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                    <div
                      onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                      style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}
                    >
                      <span style={{ fontSize: 13, fontFamily: "monospace", color: "#aaa", minWidth: 20 }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 24 }}>{topic.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{topic.title}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{topic.relevance}</div>
                      </div>
                      <span style={{ fontSize: 11, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: ps.bg, color: ps.text, border: `1px solid ${ps.border}44` }}>
                        {topic.priority}
                      </span>
                      <span style={{ fontSize: 12, color: "#aaa", fontFamily: "monospace", minWidth: 40, textAlign: "right" }}>
                        {topicChecked}/{topic.concepts.length}
                      </span>
                      <span style={{ fontSize: 18, color: "#ccc", transform: expandedTopic === topic.id ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
                        ›
                      </span>
                    </div>
                    {expandedTopic === topic.id && (
                      <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f0f0f0" }}>
                        <div style={{ display: "flex", gap: 16, margin: "12px 0", fontSize: 12, color: "#888" }}>
                          <span>⏱ {topic.timeEstimate}</span>
                        </div>
                        {topic.concepts.map((concept, ci) => {
                          const cid = `${topic.id}-${ci}`;
                          const isExpanded = expandedConcept === cid;
                          return (
                            <div key={ci} style={{ borderLeft: `3px solid ${checkedItems[cid] ? "#2ecc71" : "#e0e0e0"}`, marginBottom: 8, background: isExpanded ? "#fafafa" : "transparent", borderRadius: "0 6px 6px 0", transition: "all 0.2s" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", cursor: "pointer" }}
                                onClick={() => setExpandedConcept(isExpanded ? null : cid)}
                              >
                                <input
                                  type="checkbox"
                                  checked={!!checkedItems[cid]}
                                  onChange={(e) => { e.stopPropagation(); toggleCheck(cid); }}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ accentColor: "#2ecc71", width: 16, height: 16 }}
                                />
                                <span style={{ fontSize: 14, fontWeight: 600, flex: 1, textDecoration: checkedItems[cid] ? "line-through" : "none", color: checkedItems[cid] ? "#aaa" : "#2c2c2c" }}>
                                  {concept.term}
                                </span>
                                <span style={{ fontSize: 16, color: "#ccc", transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                              </div>
                              {isExpanded && (
                                <div style={{ padding: "4px 12px 16px 38px", fontSize: 13, lineHeight: 1.7 }}>
                                  <div style={{ marginBottom: 10 }}>
                                    <span style={{ fontWeight: 700, color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Definition</span>
                                    <div style={{ color: "#444" }}>{concept.definition}</div>
                                  </div>
                                  <div style={{ marginBottom: 10 }}>
                                    <span style={{ fontWeight: 700, color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Why it matters</span>
                                    <div style={{ color: "#444" }}>{concept.whyItMatters}</div>
                                  </div>
                                  <div style={{ background: "#f0f7ff", borderRadius: 6, padding: "10px 12px" }}>
                                    <span style={{ fontWeight: 700, color: "#2980b9", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>In your project</span>
                                    <div style={{ color: "#2c3e50", fontFamily: "'Courier New', monospace", fontSize: 12, marginTop: 4 }}>{concept.inYourProject}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ALL TOPICS TAB */}
        {activeTab === "by-priority" && (
          <div>
            {Object.keys(PRIORITY_STYLES).map((priority) => {
              const ps = PRIORITY_STYLES[priority];
              const topics = TOPICS.filter((t) => t.priority === priority);
              if (!topics.length) return null;
              return (
                <div key={priority} style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: ps.text, fontFamily: "'Courier New', monospace", borderBottom: `2px solid ${ps.border}`, paddingBottom: 8, marginBottom: 16 }}>
                    {priority} Priority
                  </h3>
                  {topics.map((topic) => (
                    <div key={topic.id} style={{ marginBottom: 12, padding: "16px 20px", background: "#fff", borderRadius: 8, border: "1px solid #eee" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 22 }}>{topic.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 15 }}>{topic.title}</div>
                          <div style={{ fontSize: 12, color: "#999" }}>{topic.timeEstimate} · {topic.concepts.length} concepts</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {topic.concepts.map((c, i) => (
                          <span key={i} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: checkedItems[`${topic.id}-${i}`] ? "#2ecc7122" : "#f5f5f5", color: checkedItems[`${topic.id}-${i}`] ? "#27ae60" : "#777", border: `1px solid ${checkedItems[`${topic.id}-${i}`] ? "#2ecc7144" : "#e8e8e8"}` }}>
                            {checkedItems[`${topic.id}-${i}`] ? "✓ " : ""}{c.term}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === "resources" && (
          <div>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 8 }}>
              Curated from the AIAP Field Guide and supplementary sources. All free unless marked otherwise.
            </p>
            <div style={{ background: "#fffbea", border: "1px solid #f0e6b8", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "#8a6d00" }}>
              <strong>AIAP Field Guide recommended:</strong> The StatQuest Illustrated Guide to Machine Learning is highlighted as a top resource by the AIAP programme itself.
            </div>
            {TOPICS.map((topic) => (
              <div key={topic.id} style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{topic.icon}</span> {topic.title}
                </h4>
                {topic.resources.map((r, ri) => (
                  <a
                    key={ri}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", marginBottom: 4, background: "#fff", borderRadius: 6, border: "1px solid #eee", textDecoration: "none", color: "#2c2c2c", fontSize: 13, transition: "border-color 0.2s" }}
                  >
                    <span style={{ fontSize: 16 }}>{TYPE_ICONS[r.type] || "🔗"}</span>
                    <span style={{ flex: 1 }}>{r.name}</span>
                    <span style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", fontFamily: "monospace" }}>{r.type}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
