/**
 * Generate the Previous and Next URLs.
 * @param {str} baseUrl
 * @param {number} limit
 * @param {number} offset
 * @param {number} totalCount
 * @param {object} queryParams
 * @returns
 */
function buildPaginationUrls(baseUrl, limit, offset, totalCount, queryParams) {
  const params = new URLSearchParams(queryParams);

  // Remove old pagination parameters to rebuild them cleanly
  params.delete("page"); // In case it was passed
  params.delete("limit"); // Always include limit explicitly
  params.delete("offset"); // Always include offset explicitly

  const extraParams = params.toString();

  // Next URL calculation
  const nextOffset = offset + limit;
  const nextUrl =
    nextOffset < totalCount
      ? `${baseUrl}?${
          extraParams ? extraParams + "&" : ""
        }limit=${limit}&offset=${nextOffset}`
      : null;

  // Previous URL calculation
  const prevOffset = offset - limit;
  const prevUrl =
    prevOffset >= 0
      ? `${baseUrl}?${
          extraParams ? extraParams + "&" : ""
        }limit=${limit}&offset=${prevOffset}`
      : null;

  return { nextUrl, prevUrl };
}

module.exports = { buildPaginationUrls };
