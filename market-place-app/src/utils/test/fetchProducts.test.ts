import axios from "axios";
import fetchProducts from "../fetchProducts";
import { ProductType } from "@/common/types/Product.type";
import { productMock } from "@/common/test/productMock";

describe("fetchProducts", () => {
  const endpoint = "http://localhost:3002/products";

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a list of products when the request is successful", async () => {
    const mockData: ProductType[] = [JSON.parse(JSON.stringify(productMock))];

    const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValue({
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });

    const products = await fetchProducts();

    expect(axiosGetSpy).toHaveBeenCalledWith(endpoint, { timeout: 7000 });
    expect(products).toEqual(mockData);
  });

  it("should throw an error when the response status is not 200", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValue({
      data: {},
      status: 404,
      statusText: "Not Found",
      headers: {},
      config: {},
    });

    await expect(fetchProducts()).rejects.toThrow(
      "Unexpected response status: 404"
    );
    expect(axiosGetSpy).toHaveBeenCalledWith(endpoint, { timeout: 7000 });
  });

  it("should throw an error when the data is not an array", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValue({
      data: {},
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });

    await expect(fetchProducts()).rejects.toThrow(
      "Invalid data format: Expected an array of products."
    );
    expect(axiosGetSpy).toHaveBeenCalledWith(endpoint, { timeout: 7000 });
  });

  it("should throw a server error when there is an error response", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockRejectedValue({
      response: {
        status: 500,
        statusText: "Internal Server Error",
      },
    });

    await expect(fetchProducts()).rejects.toThrow(
      "Server Error: 500 Internal Server Error"
    );
    expect(axiosGetSpy).toHaveBeenCalledWith(endpoint, { timeout: 7000 });
  });

  it("should throw a network error when no response is received from the server", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockRejectedValue({
      request: {},
    });

    await expect(fetchProducts()).rejects.toThrow(
      "Network Error: No response received from the server."
    );
    expect(axiosGetSpy).toHaveBeenCalledWith(endpoint, { timeout: 7000 });
  });

  it("should throw a timeout error when the request takes too long", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockRejectedValue({
      code: "ECONNABORTED",
    });

    await expect(fetchProducts()).rejects.toThrow(
      "Network Error: Request timed out."
    );
    expect(axiosGetSpy).toHaveBeenCalledWith(endpoint, { timeout: 7000 });
  });

  it("should throw a generic error for other types of errors", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockRejectedValue(new Error("Unknown error"));

    await expect(fetchProducts()).rejects.toThrow("Error: Unknown error");
    expect(axiosGetSpy).toHaveBeenCalledWith(endpoint, { timeout: 7000 });
  });
});
