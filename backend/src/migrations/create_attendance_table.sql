-- Attendance tracking table for nurse check-in/out with GPS
CREATE TABLE IF NOT EXISTS attendance (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  shift_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  check_in_at DATETIME,
  check_out_at DATETIME,
  check_in_lat DECIMAL(10, 7),
  check_in_lng DECIMAL(10, 7),
  check_out_lat DECIMAL(10, 7),
  check_out_lng DECIMAL(10, 7),
  check_in_status ENUM('PENDING', 'CONFIRMED', 'REJECTED') DEFAULT 'PENDING',
  check_out_status ENUM('PENDING', 'CONFIRMED', 'REJECTED') DEFAULT 'PENDING',
  check_in_pin VARCHAR(10),
  check_out_pin VARCHAR(10),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (shift_id) REFERENCES shifts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_shift (shift_id),
  INDEX idx_user (user_id),
  INDEX idx_check_in_at (check_in_at),
  INDEX idx_check_out_at (check_out_at)
);

