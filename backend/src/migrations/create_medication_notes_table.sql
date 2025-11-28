-- Medication notes table for resident medication tracking
CREATE TABLE IF NOT EXISTS medication_notes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resident_id BIGINT NOT NULL,
  medication_name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  route VARCHAR(50), -- ORAL, IV, IM, TOPICAL, etc.
  start_date DATE,
  end_date DATE,
  prescribed_by VARCHAR(255),
  notes TEXT,
  status ENUM('ACTIVE', 'DISCONTINUED', 'COMPLETED') DEFAULT 'ACTIVE',
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_resident (resident_id),
  INDEX idx_status (status),
  INDEX idx_start_date (start_date)
);

