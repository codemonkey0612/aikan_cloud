-- Vital alerts table for monitoring vital signs outside safe ranges
CREATE TABLE IF NOT EXISTS vital_alerts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resident_id BIGINT NOT NULL,
  alert_type ENUM('SYSTOLIC_BP', 'DIASTOLIC_BP', 'PULSE', 'TEMPERATURE', 'SPO2') NOT NULL,
  min_value DECIMAL(10, 2),
  max_value DECIMAL(10, 2),
  severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'MEDIUM',
  active BOOLEAN DEFAULT TRUE,
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_resident (resident_id),
  INDEX idx_active (active),
  INDEX idx_alert_type (alert_type)
);

-- Vital alert triggers (records when alerts are triggered)
CREATE TABLE IF NOT EXISTS vital_alert_triggers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vital_record_id BIGINT NOT NULL,
  vital_alert_id BIGINT NOT NULL,
  measured_value DECIMAL(10, 2) NOT NULL,
  triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_by BIGINT,
  acknowledged_at DATETIME,
  notes TEXT,
  FOREIGN KEY (vital_record_id) REFERENCES vital_records(id) ON DELETE CASCADE,
  FOREIGN KEY (vital_alert_id) REFERENCES vital_alerts(id) ON DELETE CASCADE,
  FOREIGN KEY (acknowledged_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_vital_record (vital_record_id),
  INDEX idx_vital_alert (vital_alert_id),
  INDEX idx_acknowledged (acknowledged),
  INDEX idx_triggered_at (triggered_at)
);

