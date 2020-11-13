import { useNavigation } from "@react-navigation/native"
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useCallback, useState } from "reactn"

export const searchService = {
  useSearch(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (value: string) => void,
    [any],
    () => void
  ] {
    const [searchType, setSearchType] = useState<string>('')
    const [searchData, setSearchData] = useState<string>('')
    const [searchResult, setSearchResult] = useState<[any]>()
    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation()

    const handleSearchDataChange = useCallback((
      event: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
      setSearchData(event.nativeEvent.text)
    }, [])

    const handleSearchTypeChange = useCallback((
      value: string
    ) => {
      setSearchType(value)
    }, [])

    const handleSearch = useCallback(async () => {
      /**
       * Search and changes of searchResult are done here.
       */
      console.log('Searching with ' + searchType + ' ' + searchData)
    }, [])

    return [
      searchData,
      handleSearchDataChange,
      searchType,
      handleSearchTypeChange,
      searchResult,
      handleSearch,
    ]
  },
  useViewDetail(): [
    (item: {type: string, id: number}) => void
  ] {
    const navigation = useNavigation()
    const handleItemClick = useCallback((item: {type: string, id: number}) => {
      console.log('Viewing item type="' + item.type + '", id="' + item.id + '"')
      if (item.type === 'user') {
      } else if (item.type === 'company') {

      } else if (item.type === 'job') {

      } else {

      }
    }, [])
    return [handleItemClick]
  }
}
