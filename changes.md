# Changelog

## 2025-07-04 - Move Sanity Meter in Header

**Plan:**

Modify `src/components/GameHeader.jsx` to reposition the Sanity Meter.

1.  Wrap the existing `div.trader-box` (character info) and the `div.sanity-container` (sanity meter) within a new vertical flex container (`<div class="flex flex-col gap-2">`).
2.  Place this new container as the first element within the main horizontal flex container (`<div class="flex justify-between items-start">`).
3.  The `div.sanity-container` will be moved from the right-side stats block into this new left-side vertical container, positioned directly below the `div.trader-box`.
4.  The remaining stats (Wallet/PNL/Timer) will remain on the right side.

**Affected Files:**

*   `src/components/GameHeader.jsx`

**Visual Representation:**

```mermaid
graph TD
    subgraph GameHeader.jsx
        A[Header Title: STOP BEING POOR]
        subgraph Main Flex Container (justify-between, items-start)
            subgraph Left Column (flex flex-col gap-2)
                B[div.trader-box (Character Info)]
                C[div.sanity-container (Sanity Meter)]
            end
            subgraph Right Column (flex flex-col items-end gap-2)
                D[Wallet/PNL/Timer Group]
            end
        end
    end

    B --> C