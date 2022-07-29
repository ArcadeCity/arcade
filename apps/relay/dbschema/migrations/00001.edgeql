CREATE MIGRATION m1u5kaiwtwfgasuejg5do5kp37beuom6zgrph5pffzjhdw2jkdcbqq
    ONTO initial
{
  CREATE TYPE default::Event {
      CREATE REQUIRED PROPERTY content -> std::str;
      CREATE REQUIRED PROPERTY created_at -> std::int32;
      CREATE REQUIRED PROPERTY kind -> std::int32;
      CREATE REQUIRED PROPERTY nid -> std::str;
      CREATE REQUIRED PROPERTY pubkey -> std::str;
      CREATE REQUIRED PROPERTY sig -> std::str;
      CREATE REQUIRED PROPERTY tags -> array<std::str>;
  };
};
