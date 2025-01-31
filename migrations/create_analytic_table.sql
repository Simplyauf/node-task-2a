CREATE TABLE analytic (
    id SERIAL PRIMARY KEY,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    widget_name VARCHAR(50) NOT NULL,
    browser_type VARCHAR(255)
); 