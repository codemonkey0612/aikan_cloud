-- Care plans table for resident care planning
CREATE TABLE IF NOT EXISTS care_plans (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resident_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  status ENUM('ACTIVE', 'COMPLETED', 'CANCELLED') DEFAULT 'ACTIVE',
  priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_resident (resident_id),
  INDEX idx_status (status),
  INDEX idx_start_date (start_date)
);

-- Care plan tasks/items
CREATE TABLE IF NOT EXISTS care_plan_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  care_plan_id BIGINT NOT NULL,
  task_description TEXT NOT NULL,
  frequency VARCHAR(100),
  assigned_to BIGINT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at DATETIME,
  completed_by BIGINT,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (care_plan_id) REFERENCES care_plans(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (completed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_care_plan (care_plan_id),
  INDEX idx_completed (completed),
  INDEX idx_due_date (due_date)
);

