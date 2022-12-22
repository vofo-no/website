import { Flex, TextInput, TextArea, Stack, Text } from "@sanity/ui";
import { StringInputProps, set, unset } from "sanity";
import { useCallback } from "react";

export const TextAreaWithCounter = getStringWithCounter(TextArea);
export const TextInputWithCounter = getStringWithCounter(TextInput);

function getStringWithCounter(InputComponent) {
  return function (props: StringInputProps) {
    const { onChange, value = "", elementProps } = props;
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(
          event.currentTarget.value ? set(event.currentTarget.value) : unset()
        ),
      [onChange]
    );

    return (
      <Stack space={0}>
        <InputComponent
          {...elementProps}
          onChange={handleChange}
          value={value}
        />
        <Flex paddingTop={2} justify="flex-end">
          <Text
            muted
            size={1}
            style={{
              color: props.validation.length ? "orange" : "green",
            }}
          >
            {value.length}
          </Text>
        </Flex>
      </Stack>
    );
  };
}
