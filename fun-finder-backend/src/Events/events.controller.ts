import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import {
  GoogleApiQueryObject,
  GoogleApiQueryResponse,
} from './EventInterfaces/eventsInterfaces';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEvents } from 'src/Auth/AuthInterfaces/users.model';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  getAllEvents(): any {
    return this.eventService.getAllEvents();
  }

  @Get('/loc')
  getEventByLocationFromDataBase(@Body() object: { location: string }) {
    const location = object.location.toLowerCase();
    return this.eventService.getEventsByLocation(location);
  }

  @Post('/add')
  addEvents(
    @Body()
    fullObject: {
      name: string;
      location: string;
      relatedHobbies: string[];
    },
  ): any {
    //Bedzie typ ale nararzie nie dodaje
    this.eventService.insertEvent(
      fullObject.name,
      fullObject.location,
      fullObject.relatedHobbies,
    );
  }
  @Post('/find-places-by-localization')
  findPlaceByLocalizationGoogleApi(
    @Body() queryObject: GoogleApiQueryObject,
  ): Promise<GoogleApiQueryResponse> {
    try {
      console.log(queryObject);
      const result =
        this.eventService.getEventsByLocationFromGoogleApi(queryObject);
      return result;
    } catch (error) {
      console.error('Error processing request:', error);
      throw new HttpException('Invalid data format', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/test')
  testFunction(@Body() object: any) {
    this.eventService.createOfResourceInMongoDbOnlyIfDoesntExist(object);
  }
  @Get('/all')
  getAllPlaces() {
    return this.eventService.getAllPlaces();
  }
  @Get('/event/:id')
  getUsersEvents(@Param('id') user_id: string) {
    return this.eventService.getUsersEvents(user_id);
  }
  @Get('/add-event/:id')
  addUsersEvents(
    @Param('id') user_id: string,
    @Body() user_events: UserEvents,
  ) {
    console.log(user_events);
    return this.eventService.addUsersEvent(user_id, user_events);
  }
  @Get('/hobbies/:id')
  getUsersHobbies(@Param('id') user_id: string) {
    return this.eventService.getUsersHobbies(user_id);
  }
  @Get('/hobbies/add/:id')
  addUsersHobbies(@Param('id') user_id: string, @Body() hobbies: string[]) {
    console.log(hobbies);
    return this.eventService.addUsersHobbies(user_id, hobbies);
  }
}
