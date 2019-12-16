import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

 @Input() key: string;

  constructor( private recipe: RecipeService) { }

  ngOnInit() {
    console.log(this.key);
  }

  updateRecipe(key: string, title: string) {
    this.recipe.updateRecipe(key, title);
    console.log(title);
  }
}
