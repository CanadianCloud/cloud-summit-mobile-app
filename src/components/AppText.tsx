import React from "react";
import { Text as RNText, TextProps } from "react-native";

import { FONTS } from "@/theme/fonts";

type Props = TextProps & {
  className?: string;
};

export default function AppText({ style, className, ...rest }: Props) {
  return (
    <RNText
      {...rest}
      className={className}
      style={[{ fontFamily: FONTS.sans }, style]}
    />
  );
}
