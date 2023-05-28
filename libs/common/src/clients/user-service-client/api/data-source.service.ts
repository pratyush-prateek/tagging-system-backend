/**
 * user-service
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { DataSource } from '../model/data-source';
import { Configuration } from '../configuration';

@Injectable()
export class DataSourceService {
  protected basePath = 'http://localhost';
  public defaultHeaders: Record<string, string> = {};
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpService,
    @Optional() configuration: Configuration,
  ) {
    this.configuration = configuration || this.configuration;
    this.basePath = configuration?.basePath || this.basePath;
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    return consumes.includes(form);
  }

  /**
   *
   *
   * @param userId
   * @param dataSourceId
   * @param dataSource
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public dataSourceControllerCreateOrUpdateDataSourceUnderUser(
    userId: string,
    dataSourceId: string,
    dataSource: DataSource,
  ): Observable<AxiosResponse<any>>;
  public dataSourceControllerCreateOrUpdateDataSourceUnderUser(
    userId: string,
    dataSourceId: string,
    dataSource: DataSource,
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling dataSourceControllerCreateOrUpdateDataSourceUnderUser.',
      );
    }

    if (dataSourceId === null || dataSourceId === undefined) {
      throw new Error(
        'Required parameter dataSourceId was null or undefined when calling dataSourceControllerCreateOrUpdateDataSourceUnderUser.',
      );
    }

    if (dataSource === null || dataSource === undefined) {
      throw new Error(
        'Required parameter dataSource was null or undefined when calling dataSourceControllerCreateOrUpdateDataSourceUnderUser.',
      );
    }

    const headers = { ...this.defaultHeaders };

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers['Content-Type'] = httpContentTypeSelected;
    }
    return this.httpClient.patch<any>(
      `${this.basePath}/api/users/${encodeURIComponent(
        String(userId),
      )}/data-sources/${encodeURIComponent(String(dataSourceId))}`,
      dataSource,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }
  /**
   *
   *
   * @param userId
   * @param dataSourceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public dataSourceControllerDeleteDataSourceUnderUserAsync(
    userId: string,
    dataSourceId: string,
  ): Observable<AxiosResponse<any>>;
  public dataSourceControllerDeleteDataSourceUnderUserAsync(
    userId: string,
    dataSourceId: string,
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling dataSourceControllerDeleteDataSourceUnderUserAsync.',
      );
    }

    if (dataSourceId === null || dataSourceId === undefined) {
      throw new Error(
        'Required parameter dataSourceId was null or undefined when calling dataSourceControllerDeleteDataSourceUnderUserAsync.',
      );
    }

    const headers = { ...this.defaultHeaders };

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    return this.httpClient.delete<any>(
      `${this.basePath}/api/users/${encodeURIComponent(
        String(userId),
      )}/data-sources/${encodeURIComponent(String(dataSourceId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }
  /**
   *
   *
   * @param userId
   * @param dataSourceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public dataSourceControllerGetDataSourceUnderUserAsync(
    userId: string,
    dataSourceId: string,
  ): Observable<AxiosResponse<any>>;
  public dataSourceControllerGetDataSourceUnderUserAsync(
    userId: string,
    dataSourceId: string,
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling dataSourceControllerGetDataSourceUnderUserAsync.',
      );
    }

    if (dataSourceId === null || dataSourceId === undefined) {
      throw new Error(
        'Required parameter dataSourceId was null or undefined when calling dataSourceControllerGetDataSourceUnderUserAsync.',
      );
    }

    const headers = { ...this.defaultHeaders };

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    return this.httpClient.get<any>(
      `${this.basePath}/api/users/${encodeURIComponent(
        String(userId),
      )}/data-sources/${encodeURIComponent(String(dataSourceId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }
  /**
   *
   *
   * @param userId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public dataSourceControllerGetDataSourcesUnderUserAsync(
    userId: string,
  ): Observable<AxiosResponse<any>>;
  public dataSourceControllerGetDataSourcesUnderUserAsync(
    userId: string,
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling dataSourceControllerGetDataSourcesUnderUserAsync.',
      );
    }

    const headers = { ...this.defaultHeaders };

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    return this.httpClient.get<any>(
      `${this.basePath}/api/users/${encodeURIComponent(
        String(userId),
      )}/data-sources`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }
  /**
   *
   *
   * @param userId
   * @param dataSourceId
   * @param dataSource
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public dataSourceControllerUpdateDataSourceUnderUserAsync(
    userId: string,
    dataSourceId: string,
    dataSource: DataSource,
  ): Observable<AxiosResponse<any>>;
  public dataSourceControllerUpdateDataSourceUnderUserAsync(
    userId: string,
    dataSourceId: string,
    dataSource: DataSource,
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling dataSourceControllerUpdateDataSourceUnderUserAsync.',
      );
    }

    if (dataSourceId === null || dataSourceId === undefined) {
      throw new Error(
        'Required parameter dataSourceId was null or undefined when calling dataSourceControllerUpdateDataSourceUnderUserAsync.',
      );
    }

    if (dataSource === null || dataSource === undefined) {
      throw new Error(
        'Required parameter dataSource was null or undefined when calling dataSourceControllerUpdateDataSourceUnderUserAsync.',
      );
    }

    const headers = { ...this.defaultHeaders };

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers['Content-Type'] = httpContentTypeSelected;
    }
    return this.httpClient.post<any>(
      `${this.basePath}/api/users/${encodeURIComponent(
        String(userId),
      )}/data-sources/${encodeURIComponent(String(dataSourceId))}`,
      dataSource,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }
}
