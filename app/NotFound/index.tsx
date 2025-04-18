import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import { JText } from '@/components/JText'
import { JView } from '@/components/JView'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <JView themed flex={1} style={styles.container}>
        <JText>This screen doesn't exist.</JText>
        <Link href="/" style={styles.link}>
          <JText>Go to home screen!</JText>
        </Link>
      </JView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  }
})
