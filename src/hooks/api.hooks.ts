import { createHttpApiHooks } from "../utilities/create-http-request-hooks";
import { BookApi } from "../api/book.api";
import { BookChapterApi } from "../api/book-chapter.api";
import { CategoriesApi } from "../api/categories.api";
import { ChapterApi } from "../api/chapter.api";
import { SearchApi } from "../api/search.api";
import { TopConfigApi } from "../api/top-config.api";
import { CategoriesBooksApi } from "../api/categories-books.api";
import { GenresBooksApi } from "../api/genres-books.api";
import { GenresApi } from "../api/genres.api";
import { GuideConfigApi } from "../api/guide-config.api";
import { PriceTipApi } from "../api/price-tip.api";

export const useBookApi = () => {
  return createHttpApiHooks(BookApi.request, null)
}

export const useBookChapterApi = () => {
  return createHttpApiHooks(BookChapterApi.request, [])
}

export const useCategoriesApi = () => {
  return createHttpApiHooks(CategoriesApi.request, [])
}

export const useCategoriesBooksApi = () => {
  return createHttpApiHooks(CategoriesBooksApi.request, [])
}

export const useChapterApi = () => {
  return createHttpApiHooks(ChapterApi.request, null)
}

export const useSearchApi = () => {
  return createHttpApiHooks(SearchApi.request, [])
}

export const useTopConfigApi = () => {
  return createHttpApiHooks(TopConfigApi.request, [])
}

export const useGenresApi = () => {
  return createHttpApiHooks(GenresApi.request, [])
}

export const useGenresBooksApi = () => {
  return createHttpApiHooks(GenresBooksApi.request, [])
}

export const useGuideConfigApi = () => {
  return createHttpApiHooks(GuideConfigApi.request, null)
}

export const usePriceTipApi = () => {
  return createHttpApiHooks(PriceTipApi.request, null)
}
