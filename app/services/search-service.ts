import { useNavigation } from '@react-navigation/native'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React, { useCallback, useState } from 'reactn'
import { GlobalState } from '../config/global'
import { screens } from '../config/screens'
import { searchRepository } from '../repositories/search-repository'

export const searchService = {
  useSearch(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (value: string) => void,
    [any],
    () => void,
    (value: any[]) => void,
  ] {
    const [searchType, setSearchType] = useState<string>('user')
    const [searchData, setSearchData] = useState<string>('')
    const [searchSkillsAndSpecialty, setSearchSkillsAndSpecialty] = useState<
      string
    >('')
    const [searchResult, setSearchResult] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation()

    const handleSearchDataChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSearchData(event.nativeEvent.text)
      },
      [],
    )

    const handleSearchTypeChange = useCallback((value) => {
      setSearchType(value)
    }, [])

    const handleSearch = useCallback(async () => {
      /**
       * Search and changes of searchResult are done here.
       */
      setLoading(true)
      const response = await searchRepository.search(
        searchType,
        searchData,
        searchSkillsAndSpecialty,
        searchSkillsAndSpecialty,
      )
      setSearchResult(response)
      setLoading(false)
    }, [searchType, searchData, searchSkillsAndSpecialty])

    const handleSkillsAndSpecialtyChange = useCallback((value: []) => {
      setSearchSkillsAndSpecialty(value.toString())
    }, [])

    return [
      searchData,
      handleSearchDataChange,
      searchType,
      handleSearchTypeChange,
      searchResult,
      handleSearch,
      handleSkillsAndSpecialtyChange,
    ]
  },
  useViewDetail(): [(item: { type: string; id: number }) => void] {
    const navigation = useNavigation()
    const accountId = parseInt(React.getGlobal<GlobalState>().accountId)
    const handleItemPress = useCallback(
      (item: { type: string; id: number }) => {
        console.log(
          'Viewing item type="' + item.type + '", id="' + item.id + '"',
        )
        if (item.type === 'user') {
          // navigate sang trang user, truyền item.id vào
          if (item.id === accountId) {
            navigation.navigate(screens.authenticated.user.profile)
          } else {
            navigation.navigate(screens.authenticated.user.view.user, {
              accountId: item.id,
            })
          }
        } else if (item.type === 'company') {
          // navigate sang trang company, truyền item.id vào
          navigation.navigate(screens.authenticated.user.view.company, {
            accountId: item.id,
          })
        } else if (item.type === 'job') {
          // navigate sang trang company, truyền item.id vào
          navigation.navigate(screens.authenticated.user.view.company, {
            accountId: item.id,
          })
        } else {
          // type deo gi vay ? :D ?
        }
      },
      [navigation],
    )
    return [handleItemPress]
  },
}
