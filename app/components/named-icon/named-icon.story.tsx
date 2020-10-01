import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"

storiesOf("NamedIcon", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        {/* <NamedIcon style={{ backgroundColor: color.error }} /> */}
      </UseCase>
    </Story>
  ))
