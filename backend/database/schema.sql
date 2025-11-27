CREATE DATABASE IF NOT EXISTS aikan_cloud;
USE aikan_cloud;

-- Corporations
CREATE TABLE IF NOT EXISTS corporations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(20) UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Facilities
CREATE TABLE IF NOT EXISTS facilities (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  corporation_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(20) UNIQUE,
  postal_code VARCHAR(20),
  address VARCHAR(255),
  lat DECIMAL(10,7),
  lng DECIMAL(10,7),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (corporation_id) REFERENCES corporations(id)
);

-- Users (Nurses, Admins, Facility Staff)
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role ENUM('ADMIN','NURSE','STAFF') NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50),
  password_hash VARCHAR(255),
  active TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Residents
CREATE TABLE IF NOT EXISTS residents (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  facility_id BIGINT NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  gender ENUM('MALE','FEMALE','OTHER'),
  birth_date DATE,
  status VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (facility_id) REFERENCES facilities(id)
);

-- Vital records
CREATE TABLE IF NOT EXISTS vital_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resident_id BIGINT NOT NULL,
  measured_at DATETIME,
  systolic_bp INT,
  diastolic_bp INT,
  pulse INT,
  temperature DECIMAL(4,1),
  spo2 INT,
  note TEXT,
  created_by BIGINT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Shifts
CREATE TABLE IF NOT EXISTS shifts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  facility_id BIGINT NOT NULL,
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  shift_type VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (facility_id) REFERENCES facilities(id)
);

-- Visits
CREATE TABLE IF NOT EXISTS visits (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  shift_id BIGINT NOT NULL,
  resident_id BIGINT,
  visited_at DATETIME NOT NULL,
  note TEXT,
  FOREIGN KEY (shift_id) REFERENCES shifts(id),
  FOREIGN KEY (resident_id) REFERENCES residents(id)
);

-- Joint visits
CREATE TABLE IF NOT EXISTS joint_visits (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  visit_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (visit_id) REFERENCES visits(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Shift locations (distance)
CREATE TABLE IF NOT EXISTS shift_locations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  shift_id BIGINT NOT NULL,
  from_lat DECIMAL(10,7),
  from_lng DECIMAL(10,7),
  to_lat DECIMAL(10,7),
  to_lng DECIMAL(10,7),
  distance_km DECIMAL(8,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shift_id) REFERENCES shifts(id)
);

-- Nurse salary
CREATE TABLE IF NOT EXISTS nurse_salaries (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  year_month CHAR(7) NOT NULL,
  amount INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE (user_id, year_month)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  body TEXT,
  target_role VARCHAR(50),
  publish_from DATETIME,
  publish_to DATETIME,
  created_by BIGINT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);
