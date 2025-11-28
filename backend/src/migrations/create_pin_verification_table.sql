-- PIN verification table for status verification
CREATE TABLE IF NOT EXISTS pin_verifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  pin VARCHAR(10) NOT NULL,
  purpose ENUM('CHECK_IN', 'CHECK_OUT', 'STATUS_UPDATE') NOT NULL,
  attendance_id BIGINT,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_pin (pin),
  INDEX idx_expires_at (expires_at),
  INDEX idx_used (used)
);

