import { observer } from "mobx-react-lite"
import { Input } from "native-base"
import React from "react"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { accountService } from "../../services/account-service"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  const [
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    loading,
    handleLogin,
  ] = accountService.useLogin()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="loginScreen" />
      <Input value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
        autoFocus />
      <Input
        value={password}
        onChange={handlePasswordChange}
        textContentType="password"
        secureTextEntry
        placeholder={"Password"}
      />
      <Button text='Log me in please!' onPress={handleLogin} />
    </Screen>
  )
})
