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
import { User } from '../model/user';
import { UserRequestDto } from '../model/user-request-dto';
import { Configuration } from '../configuration';

@Injectable()
export class UserService {
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
   * @param userRequestDto
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userControllerCreateOrUpdateUserAsync(
    userRequestDto: UserRequestDto,
  ): Observable<AxiosResponse<User>>;
  public userControllerCreateOrUpdateUserAsync(
    userRequestDto: UserRequestDto,
  ): Observable<any> {
    if (userRequestDto === null || userRequestDto === undefined) {
      throw new Error(
        'Required parameter userRequestDto was null or undefined when calling userControllerCreateOrUpdateUserAsync.',
      );
    }

    const headers = { ...this.defaultHeaders };

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
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
    return this.httpClient.patch<User>(
      `${this.basePath}/api/users`,
      userRequestDto,
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
  public userControllerDeleteUserAsync(
    userId: string,
  ): Observable<AxiosResponse<any>>;
  public userControllerDeleteUserAsync(userId: string): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling userControllerDeleteUserAsync.',
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
      `${this.basePath}/api/users/${encodeURIComponent(String(userId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }
  /**
   *
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userControllerGetAllUsersAsync(): Observable<AxiosResponse<any>>;
  public userControllerGetAllUsersAsync(): Observable<any> {
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
    return this.httpClient.get<any>(`${this.basePath}/api/users`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
    });
  }
  /**
   *
   *
   * @param userId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userControllerGetUserAsync(
    userId: string,
  ): Observable<AxiosResponse<User>>;
  public userControllerGetUserAsync(userId: string): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling userControllerGetUserAsync.',
      );
    }

    const headers = { ...this.defaultHeaders };

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    return this.httpClient.get<User>(
      `${this.basePath}/api/users/${encodeURIComponent(String(userId))}`,
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
   * @param userRequestDto
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userControllerUpdateUserAsync(
    userId: string,
    userRequestDto: UserRequestDto,
  ): Observable<AxiosResponse<User>>;
  public userControllerUpdateUserAsync(
    userId: string,
    userRequestDto: UserRequestDto,
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling userControllerUpdateUserAsync.',
      );
    }

    if (userRequestDto === null || userRequestDto === undefined) {
      throw new Error(
        'Required parameter userRequestDto was null or undefined when calling userControllerUpdateUserAsync.',
      );
    }

    const headers = { ...this.defaultHeaders };

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
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
    return this.httpClient.post<User>(
      `${this.basePath}/api/users/${encodeURIComponent(String(userId))}`,
      userRequestDto,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }
}
