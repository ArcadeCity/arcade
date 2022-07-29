CREATE MIGRATION m1d4rneg25w7bfezi2xabfwksy3uo32olcmhwmbspyfshvpwalpdda
    ONTO m1u5kaiwtwfgasuejg5do5kp37beuom6zgrph5pffzjhdw2jkdcbqq
{
  ALTER TYPE default::Event {
      ALTER PROPERTY tags {
          RESET OPTIONALITY;
      };
  };
};
