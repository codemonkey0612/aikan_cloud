-- Diagnoses table for resident medical diagnoses
CREATE TABLE IF NOT EXISTS diagnoses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resident_id BIGINT NOT NULL,
  diagnosis_code VARCHAR(50),
  diagnosis_name VARCHAR(255) NOT NULL,
  diagnosis_date DATE,
  severity VARCHAR(50),
  status VARCHAR(50) DEFAULT 'ACTIVE',
  notes TEXT,
  diagnosed_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE CASCADE,
  FOREIGN KEY (diagnosed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_resident (resident_id),
  INDEX idx_status (status),
  INDEX idx_diagnosis_date (diagnosis_date)
);

