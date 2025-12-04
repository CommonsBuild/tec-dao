import { APPS_ROUTING, APP_CUSTOM_NAME } from '@/constants'
import { env } from '@/environment'
import { getIpfsUrlFromUri } from '../utils/ipfs-utils'
import { addressesEqual } from './web3-utils'
import iconSvgAcl from '@/assets/app-acl.svg'
import iconSvgKernel from '@/assets/app-kernel.svg'
import iconSvgRegistry from '@/assets/app-registry.svg'
import { APP_TYPES } from '@/app-types'

const BUDGET_APP_ADDRESSES = env('BUDGET_APP_ADDRESSES')
const GOVERNANCE_APP_ADDRESSES = env('GOVERNANCE_APP_ADDRESSES')

const KNOWN_ICONS = {
  '0x3b4bf6bf3ad5000ecf0f989d5befde585c6860fea3e574a4fab4c49d1c177d9c': iconSvgKernel,
  '0xddbcfd564f642ab5627cf68b9b7d374fb4f8a36e941a75d89c87998cef03bd61': iconSvgRegistry,
  '0xe3262375f45a6e2026b7e7b18c2b807434f2508fe1a2a3dfb493c7df8f4aad6a': iconSvgAcl,
}

export function getAppPresentationByAddress(apps, appAddress) {
  const app = apps.find(({ address }) => addressesEqual(address, appAddress))
  if (app) {
    return getAppPresentation(app)
  }
  // Return a default object when app is not found
  return {
    humanName: 'External',
    iconSrc: '',
    name: 'external',
    appName: 'external',
  }
}

export function getAppPresentation(app) {
  if (!app) {
    return {
      humanName: 'Unknown',
      iconSrc: '',
      name: 'unknown',
      appName: 'unknown',
    }
  }

  const { contentUri, name, manifest, appId } = app
  
  // Get human readable name and icon from manifest if available
  if (manifest) {
    let humanName = manifest.name ?? name
    const { icons } = manifest
    const iconPath = icons && icons[0].src

    return {
      humanName: APP_CUSTOM_NAME.get(humanName) || humanName,
      iconSrc: iconPath
        ? getIpfsUrlFromUri(contentUri) + iconPath
        : KNOWN_ICONS[appId] ?? '',
      name,
      appName: app.name,
      // shortenedName: SHORTENED_APPS_NAMES.get(name) || name,
    }
  }

  // Return a default object when manifest is not available
  const fallbackName = name || 'Unknown'
  return {
    humanName: APP_CUSTOM_NAME.get(fallbackName) || fallbackName,
    iconSrc: KNOWN_ICONS[appId] ?? '',
    name: fallbackName,
    appName: app.name || fallbackName,
  }
}

export function getAppByName(apps, appName) {
  return apps.find(({ name }) => name === appName) || null
}

export function getAppLabel(appAddress) {
  const appAddress_ = appAddress.toLowerCase()
  if (env('BUDGET_APP_ADDRESSES').includes(appAddress_)) {
    return 'Budget'
  } else if (env('GOVERNANCE_APP_ADDRESSES').includes(appAddress_)) {
    return 'Governance'
  } else {
    return appAddress
  }
}

export function getAppType(appAddress) {
  if (!appAddress) {
    return
  }

  const appAddress_ = appAddress.toLowerCase()

  if (BUDGET_APP_ADDRESSES.includes(appAddress_)) {
    return APP_TYPES.BUDGET
  }

  if (GOVERNANCE_APP_ADDRESSES.includes(appAddress_)) {
    return APP_TYPES.GOVERNANCE
  }
}

export function buildAppRoute(appName, appAddress) {
  return `/${APPS_ROUTING.get(appName)}/${appAddress}`
}

export const buildAppInstanceRoute = appName =>
  `/${APPS_ROUTING.get(appName)}/:appAddress`
