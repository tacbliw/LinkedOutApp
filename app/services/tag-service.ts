import { useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "reactn"
import { tagRepository } from "../repositories/tag-repository"

export const tagService = {
  useTag(): [
    string[],
    () => void,
    (value: string) => void
  ] {
    const [skillTag, setSkillTag] = useState<string[]>()

    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation()

    const getAllSkillTag = useCallback(async () => {
      setLoading(true)
      // const response = await searchRepository.search(searchType, searchData, searchSkillsAndSpecialty, searchSkillsAndSpecialty)
      const response = await tagRepository.getSkill('');
      setSkillTag(response.tag);
      setLoading(false)
    }, [skillTag])

    const getSkillTagByQuery = useCallback(async (value: string) => {
      
    }, [skillTag])

    return [
      skillTag,
      getAllSkillTag,
      getSkillTagByQuery,
    ]
  },
}
