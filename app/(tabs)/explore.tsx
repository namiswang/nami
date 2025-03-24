import { StyleSheet, Image, Platform } from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { JText } from '@/components/ui/JText'
import { JView } from '@/components/ui/JView'
import { IconSymbol } from '@/components/ui/IconSymbol'

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <JView style={styles.titleContainer}>
        <JText type="title">Explore</JText>
      </JView>
      <JText>This app includes example code to help you get started.</JText>
      <Collapsible title="File-based routing">
        <JText>
          This app has two screens:{' '}
          <JText type="defaultSemiBold">app/(tabs)/index.tsx</JText> and{' '}
          <JText type="defaultSemiBold">app/(tabs)/explore.tsx</JText>
        </JText>
        <JText>
          The layout file in <JText type="defaultSemiBold">app/(tabs)/_layout.tsx</JText>{' '}
          sets up the tab navigator.
        </JText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <JText type="link">Learn more</JText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <JText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <JText type="defaultSemiBold">w</JText> in the terminal running this project.
        </JText>
      </Collapsible>
      <Collapsible title="Images">
        <JText>
          For static images, you can use the <JText type="defaultSemiBold">@2x</JText> and{' '}
          <JText type="defaultSemiBold">@3x</JText> suffixes to provide files for
          different screen densities
        </JText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <JText type="link">Learn more</JText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <JText>
          Open <JText type="defaultSemiBold">app/_layout.tsx</JText> to see how to load{' '}
          <JText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </JText>
        </JText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <JText type="link">Learn more</JText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <JText>
          This template has light and dark mode support. The{' '}
          <JText type="defaultSemiBold">useColorScheme()</JText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </JText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <JText type="link">Learn more</JText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <JText>
          This template includes an example of an animated component. The{' '}
          <JText type="defaultSemiBold">components/HelloWave.tsx</JText> component uses
          the powerful <JText type="defaultSemiBold">react-native-reanimated</JText>{' '}
          library to create a waving hand animation.
        </JText>
        {Platform.select({
          ios: (
            <JText>
              The <JText type="defaultSemiBold">components/ParallaxScrollView.tsx</JText>{' '}
              component provides a parallax effect for the header image.
            </JText>
          )
        })}
      </Collapsible>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8
  }
})
