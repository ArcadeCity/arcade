module default {
  type Event {
    required property nid -> str;
    required property pubkey -> str;
    required property created_at -> int32;
    required property kind -> int32;
    property tags -> array<str>;
    required property content -> str;
    required property sig -> str;
  }
}
