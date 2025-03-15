CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Password_Resets (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id),
    token VARCHAR(100) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE Friends (
    user_id INT REFERENCES Users(id),
    friend_id INT REFERENCES Users(id),
    status VARCHAR(10) CHECK (status IN ('pending', 'accepted')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id)
);

CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts(id),
    user_id INT REFERENCES Users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Likes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id),
    post_id INT REFERENCES Posts(id) NULL,
    comment_id INT REFERENCES Comments(id) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (post_id IS NOT NULL OR comment_id IS NOT NULL)
);

CREATE TABLE Messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES Users(id),
    receiver_id INT REFERENCES Users(id),
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);