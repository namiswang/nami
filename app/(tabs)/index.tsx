import { Image, StyleSheet, Platform } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { JText } from '@/components/ui/JText'
import { JView } from '@/components/ui/JView'

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <JView style={styles.titleContainer}>
        <JText>Welcome!</JText>
        <HelloWave />
      </JView>
      <JView style={styles.stepContainer}>
        <JText>Step 1: Try it</JText>
        <JText>
          Edit <JText>app/(tabs)/index.tsx</JText> to see changes.
          Press{' '}
          <JText>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </JText>{' '}
          to open developer tools.
        </JText>
      </JView>
      <JView style={styles.stepContainer}>
        <JText>Step 2: Explore</JText>
        <JText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </JText>
      </JView>
      <JView style={styles.stepContainer}>
        <JText>Step 3: Get a fresh start</JText>
        <JText>
          When you're ready, run{' '}
          <JText>npm run reset-project</JText> to get a fresh{' '}
          <JText>app</JText> directory. This will move the current{' '}
          <JText>app</JText> to{' '}
          <JText>app-example</JText>.
        </JText>
      </JView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
})
