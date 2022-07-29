CREATE MIGRATION m1jyuoam4v2wnqxwqe2acdsmryoobk4otpwehsfvqyw7nq2gq5yxxq
    ONTO initial
{
  CREATE TYPE default::Event {
      CREATE REQUIRED PROPERTY content -> std::str;
      CREATE REQUIRED PROPERTY created_at -> std::datetime;
      CREATE REQUIRED PROPERTY kind -> std::int32;
      CREATE REQUIRED PROPERTY nid -> std::str;
      CREATE REQUIRED PROPERTY pubkey -> std::str;
      CREATE REQUIRED PROPERTY sig -> std::str;
      CREATE REQUIRED PROPERTY tags -> array<std::str>;
  };
};
