import { ExpoResourceFetcher } from "react-native-executorch-expo-resource-fetcher";
import { ResourceFetcherUtils } from "react-native-executorch";
import { ModelItem } from "@ui/components/model-selector";

export async function getDownloadedModelIds(models: (ModelItem & { accessor: () => any })[]): Promise<Set<string>> {
  try {
    const files = await ExpoResourceFetcher.listDownloadedFiles();
    const downloaded = new Set<string>();

    for (const m of models) {
      const filename = ResourceFetcherUtils.getFilenameFromUri(m.accessor().modelSource);

      if (files.some((path) => path.endsWith(filename))) {
        downloaded.add(m.id);
      }
    }

    return downloaded;
  } catch {
    return new Set<string>();
  }
}
