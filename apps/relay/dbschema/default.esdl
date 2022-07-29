module default {
  type Event {
    required property nid -> str;
    required property pubkey -> str;
    required property created_at -> datetime;
    required property kind -> int32;
    required property tags -> array<str>;
    required property content -> str;
    required property sig -> str;
  }
}
